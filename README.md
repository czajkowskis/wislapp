# Project Overview

## General Information
Wislapp is a tutoring system designed to help users learn basic Polish vocabular.
It is designed to provide tailored learning experiences by incorporating interactive exercises with available pronunciation, 
real-time feedback and performance tracking to ensure comprehensive understanding and retention of Polish vocabulary.

## Usage of the system
At the beginning, the users are shown the list of available lessons. After choosing one, they enter the Learning Mode 
in which they are presented with the Polish word and its English translation  The pronunciation of the word is available on demand, 
by clicking on the speaker icon. When ready, users confirm the acknowledgment by clicking the button.

When the lesson is finished, users take the quiz on newly learned content. Each question has 3 possible answers, and they have to choose the correct one.
In case of the wrong answer, the chosen text becomes red, and the fail sound is played. In case of the correct answer, the chosen text becomes green, and the success sound is played. 
After finishing the quiz, users are presented with their score (number of words they've got correct on the first try) and time taken to complete the quiz. 
If the score is less than 50%, they are advised to repeat the lesson.

After finishing the quiz, users are taken back to the list of lessons.
# How to use the application?
To run the application locally first build the Docker image using the following command:

```console
docker build -t wislapp:latest .
```

Next, run the image using the following command:


```console
docker run -it --rm -p 8080:80 wislapp:latest
```

The app is now served at localhost:8080
