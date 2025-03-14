from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # للسماح بطلبات من React (Cross-Origin Resource Sharing)

# تحميل البيانات وتدريب النموذج عند تشغيل التطبيق
solar_data = pd.read_csv('Copy of sonar data (1).csv', header=None)
X = solar_data.drop(columns=60, axis=1)
y = solar_data[60]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, stratify=y, random_state=1)

# تدريب النموذج
model = LogisticRegression()
model.fit(X_train, y_train)

# مسار التنبؤ
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # استقبال البيانات من React
        data = request.get_json()
        input_data = data['input_data']  # قائمة تحتوي على 60 قيمة
        
        # تحويل البيانات إلى numpy array وإعادة تشكيلها
        input_data_np_array = np.asarray(input_data)
        reshaped_input = input_data_np_array.reshape(1, -1)
        
        # التنبؤ باستخدام النموذج
        prediction = model.predict(reshaped_input)[0]
        
        # إرجاع النتيجة كـ JSON
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)