---
title: Talks about machine learning
description: An introduction to machine learning and its applications.
date: 2025-12-02
image: https://upload.wikimedia.org/wikipedia/commons/6/64/Dall-e_3_%28jan_%2724%29_artificial_intelligence_icon.png
minRead: 6
author:
  name: Chuge Liu
  avatar:
    src: https://avatars.githubusercontent.com/u/79881792?v=4
    alt: Chuge Liu
---

To this day, the common computer programs used by people are almost all written by software developers from scratch. For example, now that a software developer needs to write a program to manage an online shopping mall. After careful consideration, the developer may propose the following solution: First, the user interacts with the application through the web browser (or mobile application). Then, the application interacts with the database engine to save transaction history and track the dynamic of each user. In this case, the core of the application - "business logic" - provides detailed instructions on how the application should operate in various scenarios.

To improve business logic, developers must carefully consider all possible boundary cases of the application and design appropriate rules for these boundary cases. When a buyer clicks to add a product to the shopping cart, the application will add a row to the shopping cart database table, associating the user ID with the product ID. Although it is unlikely to write a perfect application in one go, in most cases, developers can start by writing an application that follows the business logic and continuously test it until it meets the user's needs. Designing and implementing automated systems based on business logic is a remarkable achievement in human cognition.

Fortunately, for the ever-growing group of machine learning scientists, automating many tasks no longer relies on human logic. Imagine if developers were to attempt to solve one of the following problems:

Develop an application that receives geographical information, satellite images, and some historical weather data, and predicts the weather for tomorrow.

Write an application that takes natural text representation of a question and correctly answers it.

Write an application that accepts an image, identifies the people in the image, and draws outlines around each person.

Write a program that recommends products to users based on their browsing history, but only when they are not likely to encounter them during natural browsing.

In these cases, even the most experienced programmers cannot come up with perfect solutions, and the reasons may vary. Sometimes the tasks may follow a pattern that changes over time, and we need programs to automatically adjust. Sometimes the relationships within the tasks may be too complex (such as the relationship between pixels and abstract categories), and we need thousands or millions of calculations. Even if the human eye can effortlessly complete these tasks that require perfect solutions, the calculations involved are beyond human comprehension. Machine learning (ML) is a class of powerful technologies that can learn from experience. Typically, it uses observational data or interaction with the environment, and the performance of the ML algorithm improves over time. On the other hand, for the e-commerce platform described in the previous section, if it continues to execute the same business logic, no matter how much experience is accumulated, it will not automatically improve, unless the developers recognize the problem and update the software. This book will guide readers on their journey with machine learning, particularly focusing on the foundational knowledge of deep learning (DL). Deep learning is a set of powerful technologies that can drive innovation in various fields such as computer vision, natural language processing, healthcare, and genomics.
