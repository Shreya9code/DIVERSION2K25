import streamlit as st
import os
from PIL import Image
import google.generativeai as genai
from googletrans import Translator

#import pytesseract
# Set the path to the Tesseract executable
#pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
# Configure Gemini AI API
genai.configure(api_key="AIzaSyAJiWbzaJJFQGwZAANH4uDKKIAsedDDqVI")  # Replace with your actual API Key

model = genai.GenerativeModel('gemini-1.5-flash')

def input_image_setup(uploaded_file):
    if uploaded_file is not None:
        bytes_data = uploaded_file.getvalue()
        image_parts = [{"mime_type": uploaded_file.type, "data": bytes_data}]
        return image_parts
    else:
        raise FileNotFoundError("No file uploaded")

def get_gemini_response(input_text, image, prompt):
    response = model.generate_content([input_text, image[0], prompt])
    return response.text

st.set_page_config(page_title="Prescription Reader",page_icon="🩺")
st.header("🩺 AI-Powered Prescription Reader")

question = st.text_input("Ask about your prescription: ", key="input")
uploaded_file = st.file_uploader("Upload your prescription...", type=['jpg', 'jpeg', 'png'])

if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Prescription", use_column_width=True)

    # OCR Process
    #st.write("Processing the image...")
    #text = pytesseract.image_to_string(image)

    # Display the extracted text
    #st.write("Here is the text extracted from the image:")
    #st.text_area("Extracted Text", text, height=200)  

input_prompt = "You are an expert in medical prescriptions. Analyze the image and answer queries."
medicine_prompt = "Extract medicine details (name, uses, side effects, safety tips)."

submit = st.button("🔍 Analyze Prescription")
# Initialize the translator
translator = Translator()
# Translation Feature
st.subheader("Translation Settings")
st.markdown("If you'd like to translate the response into another language, choose a target language below:")
target_language = st.selectbox("Select target language:", ["None", "en", "es", "fr", "de", "zh-cn","hi","ja","ko","pt","ru","bn","bh","gu","ks","ml","ko","mr","ne","or","pa","sa","ta","te"])

if submit:
    if uploaded_file is not None:
        image_data = input_image_setup(uploaded_file)
        response = get_gemini_response(input_prompt, image_data, question)
        medicine_details = get_gemini_response(medicine_prompt, image_data, "")

        st.subheader("📝 Prescription Analysis:")
        st.write(response)

        st.subheader("💊 Extracted Medicine Details:")
        st.write(medicine_details)
        # Handle translation
        if target_language != "None":
            translation = translator.translate(medicine_name, dest=target_language)
            st.subheader(f"Translated to {target_language.upper()}:")
            st.write(translation.text)
    else:
        st.error("⚠️ Please upload a prescription image.")


# Introduction Section
st.markdown("""
# 🏥 Swasthya Sahayak's AI-Powered Prescription Reader  
Welcome to **Swasthya Sahayak's** AI-powered tool that helps you understand your medical prescriptions.  
""")

# Instructions Section
st.subheader("📌 How to Use:")
st.markdown("""
1. **📤 Upload Your Prescription:**  
   Click on the **"Browse files"** button and select an image of your handwritten medical prescription  
   (Supported formats: **JPG, JPEG, PNG**).
   
2. **🤖 Click 'Analyze Prescription':**  
   Press the **"Analyze Prescription"** button to extract and analyze the medicines mentioned.

3. **📋 Review Results:**  
   The AI will generate a **detailed breakdown** of the prescription, including:
   - Medicine names  
   - Their dosage  
   - Side effects  
   - Safety advice  
""")
