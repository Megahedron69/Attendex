import cv2
import time

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

# Load the image
image = cv2.imread("Untitled 1.png")

# Convert the image to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Detect faces in the image
faces = face_cascade.detectMultiScale(
    gray, scaleFactor=1.1, minNeighbors=5, minSize=(96, 96)
)
timestamp = int(time.time())
# Extract and save each detected face
for i, (x, y, w, h) in enumerate(faces):
    # Extract the face region
    face_roi = image[y : y + h, x : x + w]

    # Save the extracted face as a separate image
    cv2.imwrite(f"face_{timestamp}_{i}.png", face_roi)

    # Draw a rectangle around the detected face on the original image
    cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 2)

# Display the original image with rectangles around detected faces
# cv2.imshow(image)
cv2.waitKey(0)
cv2.destroyAllWindows()
