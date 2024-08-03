#!/bin/bash

image_extensions=("*.jpg" "*.jpeg" "*.png" "*.gif" "*.bmp" "*.tiff" "*.svg" "*.webp")
idcards_folder="../idCards"
for ext in "${image_extensions[@]}"; do
    echo "Deleting $ext files in $idcards_folder..."
    find "$idcards_folder" -type f -name "$ext" -print0 | xargs -0 rm -v
done
echo "All image files in $idcards_folder deleted."
