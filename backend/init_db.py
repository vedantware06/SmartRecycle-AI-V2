
from backend.database import Base, engine
from backend import models


def initialize_database():
    Base.metadata.create_all(bind=engine)

    print("SmartRecycle AI V2.0 Database initialized!")
    print("Tables created:")
    for table_name in Base.metadata.tables:
        print(f"- {table_name}")


if __name__ == "__main__":
    initialize_database()
