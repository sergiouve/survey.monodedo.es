import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Survey from 'App/Domain/Surveys/Models/Survey'
import Question from 'App/Domain/Questions/Models/Question'
import QuestionCategory from 'App/Domain/Questions/Models/QuestionCategory'
import QuestionOption from 'App/Domain/Questions/Models/QuestionOption'

const data = {
    "survey": {
        "name": "2021"
    },
    "questions": {
        "personal": [
            {
                "text": "q_birthdate",
                "type": "OPEN",
                "required": true
            },
            {
                "text": "q_sex",
                "type": "SINGLE",
                "required": true
            }
        ],
        "training": [
            {
                "text": "q_days_of_training_per_week",
                "type": "SINGLE",
                "required": true
            },
            {
                "text": "q_trains_at_home",
                "type": "SINGLE",
                "required": false
            }
        ],
        "outside": [
            {
                "text": "q_days_of_outside_climbing_per_week",
                "type": "SINGLE",
                "required": true
            },
            {
                "text": "q_bouldering_highest_grade",
                "type": "SINGLE",
                "required": true,
                "options": [
                    "V",
                    "V+",
                    "6a",
                    "6a+",
                    "6b",
                    "6b+",
                    "6c",
                    "6c+",
                    "7a",
                    "7a+",
                    "7b",
                    "7b+",
                    "7c",
                    "7c+",
                    "8a",
                    "8a+",
                    "8b",
                    "8b+",
                    "8c",
                    "8c+",
                    "9a",
                ]
            },
            {
                "text": "q_sport_highest_grade",
                "type": "SINGLE",
                "required": true,
                "options": [
                    "V",
                    "V+",
                    "6a",
                    "6a+",
                    "6b",
                    "6b+",
                    "6c",
                    "6c+",
                    "7a",
                    "7a+",
                    "7b",
                    "7b+",
                    "7c",
                    "7c+",
                    "8a",
                    "8a+",
                    "8b",
                    "8b+",
                    "8c",
                    "8c+",
                    "9a",
                    "9a+",
                    "9b",
                    "9b+",
                    "9c",
                ]
            },
            {
                "text": "q_trad_highest_grade",
                "type": "SINGLE",
                "required": true,
                "options": [
                    "V",
                    "V+",
                    "6a",
                    "6a+",
                    "6b",
                    "6b+",
                    "6c",
                    "6c+",
                    "7a",
                    "7a+",
                    "7b",
                    "7b+",
                    "7c",
                    "7c+",
                    "8a",
                    "8a+",
                    "8b",
                    "8b+",
                    "8c",
                    "8c+",
                ]
            }
        ],
        "social": [
            {
                "text": "q_started_alone_or_with_friends",
                "type": "SINGLE",
                "required": true
            }
        ],
        "gear": [
            {
                "text": "q_gear_sharing",
                "type": "SINGLE",
                "required": true
            }
        ]
    }
}

class SurveySeeder extends BaseSeeder {
    public async run () {
        const survey = await Survey.firstOrCreate({ name: data['survey']['name'] })
        const questions = data['questions']

        for (const categoryName in questions) {
            let order = 1
            const category = await QuestionCategory.firstOrCreate({ name: categoryName })

            for (const question of questions[categoryName]) {
                const questionModel = await Question.create({
                    'surveyId': survey.id,
                    'categoryId': category.id,
                    'text': question['text'],
                    order,
                    'type': question['type'],
                    'required': question['required']
                })

                order++

                if (question['options'] == null) continue

                for (const option of question['options']) {
                    await QuestionOption.create({
                        'questionId': questionModel.id,
                        'text': option,
                    })
                }
            }
        }
    }
}

export default SurveySeeder
