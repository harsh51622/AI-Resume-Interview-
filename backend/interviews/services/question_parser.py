def question_parser(text):
    question=[]
    line= text.split("\n")

    for lines in line:
        e = lines.strip()
        if e:
          question.append(e)     
    return question