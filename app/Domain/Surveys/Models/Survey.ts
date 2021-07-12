import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import SurveySession from 'App/Domain/Surveys/Models/SurveySession'
import Question from 'App/Domain/Questions/Models/Question'

class Survey extends BaseModel {
    public static table: string = 'surveys_surveys'

    private static steps: Array<string> = [
        'personal',
        'training',
        'social',
        'outside',
        'gear',
    ]

    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public isActive: boolean

    @column.dateTime()
    public startsAt: DateTime

    @column.dateTime()
    public endsAt: DateTime

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasMany(() => SurveySession, { foreignKey: 'surveyId' })
    public sessions: HasMany<typeof SurveySession>

    @hasMany(() => Question, { foreignKey: 'surveyId' })
    public questions: HasMany<typeof Question>

    static async getCurrentActive(): Promise<Survey|null> {
        return await Survey.query().where('is_active', true).first()
    }

    public static getStepNameFromIndex(index: number): string {
        return Survey.steps[index]
    }

    public static getStepsLength(): number {
        return Survey.steps.length
    }
}

export default Survey
