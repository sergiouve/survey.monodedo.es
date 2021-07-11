import { BaseModel, column, scope, belongsTo, BelongsTo, } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Survey from 'App/Domain/Surveys/Models/Survey'
import QuestionCategory from 'App/Domain/Questions/Models/QuestionCategory'

class Question extends BaseModel {
    public static table: string = 'questions_questions'

    public static types: Object = {
        OPEN: 'OPEN',
        SINGLE: 'SINGLE',
        MULTIPLE: 'MULTIPLE',
    }

    @column({ isPrimary: true })
    public id: number

    @column()
    public surveyId: number

    @column()
    public categoryId: number

    @column()
    public text: string

    @column()
    public type: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Survey)
    public survey: BelongsTo<typeof Survey>

    @belongsTo(() => QuestionCategory)
    public category: BelongsTo<typeof QuestionCategory>

    public static fromCategory = scope((query, category: QuestionCategory) => {
        query.where('category_id', category.id)
    })
}

export default Question
