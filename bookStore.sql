CREATE DATABASE IF NOT EXISTS bookStore;

USE bookStore;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    genre VARCHAR(100),
    description TEXT,
    image_url VARCHAR(255),
    published_year YEAR,
    isbn VARCHAR(20)
);

INSERT INTO books (title, author, genre, description, image_url, published_year, isbn)
VALUES 
('Toxic', 'Nicole Blanchard', 'Dark Romance', 'Toxic by Nicole Blanchard is the story of Tessa Emmerson and Gracin Kingsley. Tessa is a RN at the Blackthorne Correctional Institute and her husband Vic is the warden there. Vic is an abusive husband who constantly beats or forces her to have sex.', 'https://m.media-amazon.com/images/I/611FHaDVccL._AC_UF1000,1000_QL80_.jpg', 2017, '9798990430303'),
('The Alchemist', 'Paolo Coelho', 'Adventure Fiction', 'The Alchemist is a classic novel in which a boy named Santiago embarks on a journey seeking treasure in the Egyptian pyramids after having a recurring dream about it and on the way meets mentors, falls in love, and most importantly, learns the true importance of who he is and how to improve himself and focus on what really matters in life.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG4DIZ8zeBMCj1s7gRvHEAliiPmGukocfFUr8wElGeM73oZ2SY', 1988, '9780061122415'),
('The Subtle Art of Not Giving a F*ck', 'Mark Manson', 'Self-help book', 'The Subtle Art of Not Giving a F*ck argues that individuals should seek to find meaning through what they find to be important and only engage in values that they can control.', 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L._AC_UL600_SR600,400_.jpg', 2016, '9780062641540'),
('Verity', 'Colleen Hoover', 'Thriller-Suspense', 'Verity by Colleen Hoover is a suspenseful novel about a struggling writer who takes on a job to finish the bestselling series of acclaimed author Verity Crawford. As she delves into Veritys notes, she uncovers dark secrets that threaten her sanity and safety.', 'https://m.media-amazon.com/images/I/91868k2+gUL._AC_UF894,1000_QL80_.jpg', 2018, '9783423230124'),
('Forty Rules of Love', 'Elif Shafak', 'Literary Fiction', 'Forty rules is a story of a middle aged women Ella who reads a manuscript about the thirteenth-century Sufi poet Rumi and Shams of Tabriz and his forty rules of life and love. However, Ella had no idea how this manuscript and her interaction with the author is going to bring enormous shifts in her life.', 'https://images-eu.ssl-images-amazon.com/images/I/91Q4lLuogQL._AC_UL210_SR210,210_.jpg', 2009, '9780141047188'),
('The Fault in Our Stars', 'John Green', 'Young Adult Fiction', 'The Fault in Our Stars by John Green is a young adult fiction novel that narrates the story of a 16-year-old girl who is diagnosed with cancer. She joins a support group where she meets Augustus, and there is a rollercoaster of emotions throughout this novel as the relationship between Hazel and Augustus develops.', 'https://readwatchdrinkcoffee.files.wordpress.com/2014/07/fault-in-our-stars.jpg?w=600', 2012, '9780143567592'),
('All Your Perfects', 'Colleen Hoover', 'Romance Fiction', 'All Your Perfects is a profound novel about a damaged couple whose potential future hinges on promises made in the past. This is a heartbreaking page-turner that asks: Can a resounding love with a perfect beginning survive a lifetime between two imperfect people?', 'https://m.media-amazon.com/images/I/71L5vWJf6JL._AC_UF894,1000_QL80_.jpg', 2022, '1501171593'),
('The Silent Patient', 'Alex Michaelides', 'Thriller', 'The Silent Patient is a psychological thriller about Alicia Berenson, a famous painter who shoots her husband and then stops speaking. The story unravels through the eyes of her therapist, who is determined to uncover the truth behind her silence.', 'https://images.thalia.media/00/-/fb92aacebf9b49d8942fb9aeb9f98a91/the-silent-patient-taschenbuch-alex-michaelides-englisch.jpeg', 2019, '1250301696'),
('Friends, Lovers, and the Big Terrible Thing', 'Matthew Perry', 'Memoir', 'Friends, Lovers, and the Big Terrible Thing is a candid memoir by Matthew Perry, where he shares his experiences with fame, addiction, and his journey towards recovery. It offers an honest look into the life of the beloved Friends star and the challenges he faced behind the scenes.', 'https://m.media-amazon.com/images/I/71aVGWARVoL._SL1500_.jpg', 2022, '1250866448'),
('A Little Life', 'Hanya Yanagihara', 'Literary Fiction', 'A Little Life follows the lives of four friends in New York City as they navigate love, trauma, and ambition. This deeply emotional and complex novel explores themes of friendship, suffering, and the lasting impact of abuse.', 'https://images.thalia.media/-/BF2000-2000/a26e1a07620645be82090e47b99eeb88/a-little-life-taschenbuch-hanya-yanagihara-englisch.jpeg', 2015, '0804172706');

SELECT * FROM books;
