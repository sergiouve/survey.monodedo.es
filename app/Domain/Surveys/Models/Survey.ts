import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import SurveySession from 'App/Domain/Surveys/Models/SurveySession'

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

    public getStepNameFromIndex(index: number): string {
        return Survey.steps[index]
    }

    public getStepNumber(): number {
        return Survey.steps.length
    }
}

export default Survey
