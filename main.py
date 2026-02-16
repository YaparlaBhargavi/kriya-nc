from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

products = []


@app.get("/")
def home():
    return {"message": "Backend working 🚀"}


@app.get("/products")
def get_products():
    return products


@app.post("/products")
def add_product(product: dict):
    products.append(product)
    return {"message": "Product added successfully"}
