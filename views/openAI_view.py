from flask_restful import Resource, reqparse
import requests
import os
from openai import OpenAI

client = OpenAI()


class OpenAIService(Resource):
    def post(self):
        """
        Handles a POST request to the OpenAIService resource.

        Parses the user prompt from the request, calls the get_openai_completions() method to get completions from the OpenAI API, and returns the completions.

        Returns:
        - dict: The completions from the OpenAI API.
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
        pre_prompt = "Welcome to the garden of knowledge! 🌱 I'm a gardening enthusiast, and I'm here to help with all things gardening. Feel free to ask me your gardening questions, or let's explore the wonderful world of plants and vegetables. I'm a technical expert of how to plant, to water or harvest different varieties of vegetables in France. But be warned, if your question strays too far from the garden, I might lead you back with a touch of irony! 😉. I will not hesitate to refer about the garden. I will try to be concise in my answers to give most informations in maximum 300 tokens "
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": pre_prompt},
            {"role": "user", "content": user_prompt}
            ]
        )

        return(completion.choices[0].message.content)
