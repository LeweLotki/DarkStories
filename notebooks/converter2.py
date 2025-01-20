import csv
import json

def csv_to_jsonl(csv_file, jsonl_file):
    """
    Converts a CSV file to a JSONL file with a specific structure for fine-tuning GPT models.

    Args:
        csv_file (str): Path to the input CSV file.
        jsonl_file (str): Path to the output JSONL file.
    """
    try:
        # Open the CSV file
        with open(csv_file, mode='r', encoding='utf-8') as csv_file_obj:
            csv_reader = csv.DictReader(csv_file_obj)
            
            # Open the JSONL file
            with open(jsonl_file, mode='w', encoding='utf-8') as jsonl_file_obj:
                for row in csv_reader:
                    # Construct the JSON object
                    jsonl_obj = {
                        "messages": [
                            {
                                "role": "system",
                                "content": "You are a game master."
                            },
                            {
                                "role": "user",
                                "content": (
                                    f"You are given a dark story, which description is known to the user "
                                    f"however its solution is known only to you. User tried to solve the puzzle. "
                                    f"Your goal is to decide wheter the user found the essence of the solution. "
                                    f"Respond with TRUE, if the user found out the essence of the puzzle "
                                    f"or FALSE if he failed to do so. The known description to the dark story: "
                                    f"{row['description']} and here is solution to the dark story: {row['solution']} "
                                    f"user solution is as follow: {row['user_solution']}."
                                )
                            },
                            {
                                "role": "assistant",
                                "content": row['answer']
                            }
                        ]
                    }
                    # Write to JSONL
                    jsonl_file_obj.write(json.dumps(jsonl_obj, ensure_ascii=False) + '\n')

        print(f"Successfully converted {csv_file} to {jsonl_file}!")
    except Exception as e:
        print(f"Error: {e}")

# Specify input CSV and output JSONL file paths
input_csv = "prompts2.csv"  # Replace with your CSV file path
output_jsonl = "prompts2.jsonl"  # Replace with your desired JSONL output file path

# Convert the file
csv_to_jsonl(input_csv, output_jsonl)

