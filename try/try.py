# import pywhatkit
# pywhatkit.sendwhatmsg("+918796105704","hiiiiii",19,42,25)
# import pywhatkit as pyw
# phone_number = "+918796105704"
# image_path = "bill.pdf"
# pyw.sendwhats_image(phone_number, image_path,"testing message")





import pywhatkit as pyw
import fitz  
import os
phone_number = "+918605105157"
pdf_path = "bill.pdf"
images = []
doc = fitz.open(pdf_path)
for page in doc:
    image = page.get_pixmap()
    images.append(image)
temp_dir = "temp_images"
os.makedirs(temp_dir, exist_ok=True)
image_paths = []
for i, image in enumerate(images):
    image_path = os.path.join(temp_dir, f"page_{i+1}.png")
    image.save(image_path)
    image_paths.append(image_path)
for image_path in image_paths:
    pyw.sendwhats_image(phone_number, image_path, caption="Testing this is testing message by Tejas Tathe please ignore it")
for image_path in image_paths:
    os.remove(image_path)
os.rmdir(temp_dir)