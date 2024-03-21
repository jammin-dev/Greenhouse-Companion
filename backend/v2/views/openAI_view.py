"""
Module: resources.openai_service_resource

This module defines a RESTful resource for interacting with the OpenAI API in a gardening system using Flask-RESTful.

Classes:
    - OpenAIService: Represents the OpenAI service endpoint and provides a POST method.

"""

from flask_restful import Resource, reqparse
import requests
import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

class OpenAIService(Resource):
    """
    Class: OpenAIService

    Represents the OpenAI service endpoint and provides a POST method for interacting with the OpenAI API.

    Methods:
        - post: Handle a POST request to the OpenAIService resource, get completions from the OpenAI API, and return the completions.

    """
    def post(self):
        """
        Handle a POST request to the OpenAIService resource, get completions from the OpenAI API, and return the completions.

        Parameters:
            - None

        Returns:
            - str: The completions from the OpenAI API.

        """
        parser_create = reqparse.RequestParser()
        argument_list = [
            ('user-prompt', str, 'User Prompt is required', True)
        ]

        for arg_name, arg_type, arg_help, arg_required in argument_list:
            parser_create.add_argument(
                arg_name,
                type=arg_type,
                help=arg_help,
                required=arg_required
            )

        args = parser_create.parse_args()
        user_prompt = args['user-prompt']
        pre_prompt = "You are a gardening expert chatbot in France (celcius degrees and metric system). If the user asks about any other topic, politely inform them that the chatbot is designed specifically for gardening-related queries."
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": pre_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.8
        )

        return (completion.choices[0].message.content)
