-- Sequence to generate auto-incrementing IDs for users
CREATE SEQUENCE users_seq START WITH 1 INCREMENT BY 1;

-- Table to store user data
CREATE TABLE users (
    id INT DEFAULT users_seq.nextval PRIMARY KEY,
    name VARCHAR2(60) NOT NULL,
    email VARCHAR2(255) UNIQUE NOT NULL,
    password VARCHAR2(255) NOT NULL,
    role VARCHAR2(50) NOT NULL
);

-- Table to store store data
CREATE TABLE stores (
    id VARCHAR2(50) PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    address VARCHAR2(400),
    category VARCHAR2(50),
    ownerId VARCHAR2(50)
);

-- Sequence to generate auto-incrementing IDs for ratings
CREATE SEQUENCE store_ratings_seq START WITH 1 INCREMENT BY 1;

-- Table to store store ratings
CREATE TABLE store_ratings (
    id INT DEFAULT store_ratings_seq.nextval PRIMARY KEY,
    store_id VARCHAR2(50) REFERENCES stores(id),
    user_id INT REFERENCES users(id),
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    feedback VARCHAR2(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to automatically create a store when a store owner is registered
CREATE OR REPLACE TRIGGER trg_create_store
AFTER INSERT ON users
FOR EACH ROW
WHEN (NEW.role = 'store_owner')
BEGIN
    INSERT INTO stores (id, name, ownerId)
    VALUES ('store_' || :NEW.id, 'My New Store', TO_CHAR(:NEW.id));
END;
/

-- Insert some dummy data for easy testing
INSERT INTO users (name, email, password, role) VALUES ('Admin User', 'admin@markethub.com', 'password', 'admin');
INSERT INTO users (name, email, password, role) VALUES ('Store Owner', 'store@markethub.com', 'password', 'store_owner');
INSERT INTO users (name, email, password, role) VALUES ('John Customer', 'customer@markethub.com', 'password', 'customer');

-- Insert sample store data matching the frontend
INSERT INTO stores (id, name, address, category, ownerId) VALUES ('1', 'Lenskart', 'Waghodia, Vadodara', 'Eyeware', '2');
INSERT INTO stores (id, name, address, category, ownerId) VALUES ('2', 'Titan Eye+', 'Ajwa Road, Vadodara', 'Eyeware', '2');
INSERT INTO stores (id, name, address, category, ownerId) VALUES ('3', 'Specky', 'Genda Circle, Vadodara', 'Eyeware', '2');
I 