import openai

openai.api_key = "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"

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a vegetable gardener expert in france."},
        {"role": "user", "content": "I don't what to plant in winter."}
    ],
    max_tokens=500,
)

generated_text = response.choices[0].message.content

print(generated_text)
