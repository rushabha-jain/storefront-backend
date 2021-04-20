DROP TABLE IF EXISTS orders;

CREATE TABLE IF NOT EXISTS orders(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    product_id BIGINT REFERENCES products(id),
    quantity INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active'
);