from flask import Flask, jsonify, request  
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app,origins=["http://localhost:3000"])
popularBooks = pickle.load(open('./models/popular_book.pkl', 'rb'))
pt = pickle.load(open('./models/pt.pkl', 'rb'))
books = pickle.load(open('./models/books.pkl', 'rb'))
sm = pickle.load(open('./models/similarity_score.pkl', 'rb'))

@app.route('/')
def index():
     if popularBooks is None:
        return jsonify({"error": "Model file not found"}), 500
     try:
        pb = popularBooks.drop(columns=["num-Rating"])
        return jsonify(pb.to_dict(orient="records"))
     except IndexError:
        return jsonify({"error": "Book not found in the dataset"}), 404
    

# @app.route('/recommend_books', methods=['POST']) 
# def recommend():
#     data = request.get_json()  
#     user_input = data.get('user_input') 

#     if not user_input:
#         return jsonify({"error": "No book name provided"}), 400

#     try:
#         idx = np.where(pt.index == user_input)[0][0]  
#         similar_items = sorted(list(enumerate(sm[idx])), key=lambda x: x[1], reverse=True)[1:6]

#         recommendations = []
#         for i in similar_items:
#             item_df = books[books['Book-Title'] == pt.index[i[0]]].drop_duplicates('Book-Title')
#             item = {
#                 "Book-Title": item_df['Book-Title'].values[0],
#                 "Book-Author": item_df['Book-Author'].values[0],
#                 "Image-URL-M": item_df['Image-URL-M'].values[0]
#             }
#             recommendations.append(item)

#         return jsonify(recommendations)

#     except IndexError:
#         return jsonify({"error": "Book not found in the dataset"}), 404


@app.route('/recommend_books', methods=['GET'])  
def recommend():
    user_input = request.args.get('user_input') 

    if not user_input:
        return jsonify({"error": "No book name provided"}), 400

    try:
        idx = np.where(pt.index == user_input)[0][0]
        similar_items = sorted(list(enumerate(sm[idx])), key=lambda x: x[1], reverse=True)[1:6]

        recommendations = []
        for i in similar_items:
            item_df = books[books['Book-Title'] == pt.index[i[0]]].drop_duplicates('Book-Title')
            item = {
                "Book-Title": item_df['Book-Title'].values[0],
                "Book-Author": item_df['Book-Author'].values[0],
                "Image-URL-M": item_df['Image-URL-M'].values[0]
            }
            recommendations.append(item)

        return jsonify(recommendations)

    except IndexError:
        return jsonify({"error": "Book not found in the dataset"}), 404


if __name__ == '__main__':
    app.run(port=5001, debug=True)
