
from sqlalchemy import inspect, text

from backend.database import Base, engine
from backend import models


def initialize_database():
    Base.metadata.create_all(bind=engine)

    inspector = inspect(engine)

    user_columns = [
        column["name"]
        for column in inspector.get_columns("users")
    ]

    if "role" not in user_columns:
        with engine.begin() as connection:
            connection.execute(
                text(
                    "ALTER TABLE users "
                    "ADD COLUMN role VARCHAR(20) "
                    "NOT NULL DEFAULT 'customer'"
                )
            )

    with engine.begin() as connection:
        result = connection.execute(
            text(
                "UPDATE users SET role = 'owner' "
                "WHERE username = 'vedantv2'"
            )
        )

    print("SmartRecycle AI V2.0 Database initialized!")
    print("Owner account updated: vedantv2")


if __name__ == "__main__":
    initialize_database()
