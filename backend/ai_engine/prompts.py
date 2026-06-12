QUESTION_GENERATION_PROMPT = """
Based on the resume below, generate exactly 10 interview questions.

Rules:

* Return ONLY questions.
* Do NOT add introductions.
* Do NOT add explanations.
* Do NOT add headings.
* Do NOT add markdown.
* Start directly from Question 1.
* Focus on practical, scenario-based, and problem-solving questions.
* Avoid basic theory questions unless the skill level appears beginner.
* Generate questions according to the candidate's skills, technologies, experience, and projects mentioned in the resume.
* If Python is listed, ask advanced Python questions (OOP, concurrency, performance optimization, APIs, debugging, design patterns, etc.).
* If JavaScript is listed, ask practical JavaScript questions (closures, event loop, async/await, promises, performance, DOM, React concepts if relevant, etc.).
* If databases are listed, ask query optimization, indexing, joins, and real-world database design questions.
* If frameworks are listed, ask framework-specific practical questions.
* Exactly 2 questions must be based on the candidate's projects, focusing on architecture, challenges faced, scalability, implementation decisions, and improvements.
* Questions should assess real-world experience rather than memorized definitions.
* Make questions progressively challenging.

Format:

1. Question here
2. Question here
3. Question here

Resume:
{resume_text}
"""


INTERVIEW_EVALUATION_PROMPT = """
You are an expert interview evaluator.

Evaluate the following interview answers:

{interview_data}

Return ONLY valid JSON in this format:

{{
    "overall_score": 0,
    "communication_score": 0,
    "technical_score": 0,
    "confidence_score": 0,
    "strengths": "",
    "weaknesses": "",
    "feedback": "",
    "question_reviews": [
        {{
            "question": "",
            "user_answer": "",
            "score": 0,
            "ideal_answer": "",
            "feedback": ""
        }}
    ]
}}
"""