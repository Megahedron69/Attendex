#!/bin/bash
folder_path="/idCards"
delete_files() {
  cd "$folder_path" || exit
  rm -f ./*
}
# The format is minute hour day month day_of_week command
(crontab -l ; echo "30 15 * * * $folder_path/delete_files.sh") | crontab -
