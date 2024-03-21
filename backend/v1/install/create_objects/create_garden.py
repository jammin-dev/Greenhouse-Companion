"""
Garden Area Creation Script

This script allows users to create a garden area by sending a POST request to a RESTful API.
It prompts the user to enter the name, surface type, and optional notes for the garden area.
The provided data is sent as JSON to the API endpoint for garden area creation.

Usage:
    Run this script to interactively create a garden area.
    The garden area's name and surface type are required fields, and notes are optional.
    If the name or surface is not provided, the script exits with an error code.

Note:
    This script is intended to work with a specific API endpoint, and the URL is set to "http://127.0.0.1:5000/api/garden_area".
    Please adjust the URL as needed for your specific API setup.
"""
import requests
import sys


def create_garden_area(name, surface, notes):
    url = "http://127.0.0.1:5001/api/vegetable_infos"
    headers = {"Content-Type": "application/json"}

    data = {
        "name": name,
        "surface": surface,
        "notes": notes
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 201:
        print("Garden created successfully!")
        garden_area_data = response.json()

        print("+++++++++++++++++++++++++++")
        print("Created Garden:")
        print("\n".join([f"{key} = {value}" for key,
              value in garden_area_data.items()]))
        print("+++++++++++++++++++++++++++")
    else:
        print("Error:", response.text)


if __name__ == "__main__":
    try:
        print("Enter the following information for the garden:")
        name = input("Name: ")
        surface = input("Surface: ")
        notes = input("Notes: ")
        if surface == "":
            surface = None

        # Only call the function if name and surface are not None
        create_garden_area(name, surface, notes)
    except Exception as e:
        print("An error occurred:", str(e))
