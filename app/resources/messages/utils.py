# app/resources/messages/utils.py

import openai
import os

# Set the API key for OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

FINE_TUNED_MODEL_ID = 'ft:gpt-4o-2024-08-06:personal::Ar3P0z0W'

def use_fine_tuned_model(description: str, solution: str, question: str) -> str:
    """
    Use a fine-tuned GPT model to get a response based on the description, solution, and question.
    """
    # Define the prompt template
    prompt = f'''
    You are given a dark story, which description is known to the user 
    however its solution is known only to you. You can answer to user questions 
    about the dark story only with words YES, NO, and PASS. If the user's question is an open question 
    or irrelevant, you should answer with PASS. If the answer to the question is truthful, 
    you should open with YES, otherwise with NO. Here is the known description of the dark story: 
    {description} and here is the solution to the dark story: {solution}. 
    The user's question is as follows: {question}.
    '''

    try:
        # Call the GPT model
        response = openai.chat.completions.create(
            model=FINE_TUNED_MODEL_ID,
            messages=[
                {"role": "system", "content": "You are a game master."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error using the fine-tuned model: {e}")
        return None

