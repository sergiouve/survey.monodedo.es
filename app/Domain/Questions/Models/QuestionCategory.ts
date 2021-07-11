import { BaseModel, column, hasMany, HasMany, } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Question from 'App/Domain/Questions/Models/Question'

class QuestionCategory extends BaseModel {
    public static table: string = 'questions_categories'

    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasMany(() => Question, { foreignKey: 'categoryId' })
    public questions: HasMany<typeof Question>
}

export default QuestionCategory
