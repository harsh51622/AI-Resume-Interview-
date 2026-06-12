import fitz

def extract_text_pdf(pdf_path):
    pdf = fitz.open(pdf_path)
    text = ''

    for page in pdf:
        text += page.get_text()

    pdf.close()
    return text

 