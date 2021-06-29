import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Survey from 'App/Domain/Surveys/Models/Survey'

class SurveySession extends BaseModel {
    public static table: string = 'surveys_sessions'

    @column({ isPrimary: true })
    public id: number

    @column()
    public surveyId: number

    @column()
    public sessionHash: string

    @column()
    public stepIndex: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Survey)
    public survey: BelongsTo<typeof Survey>

    public static async findOrCreateFromHash(sessionHash: string): Promise<SurveySession> {
        return await SurveySession.findBy('sessionHash', sessionHash)
            || await SurveySession.create({
                surveyId: 1, // TODO: get current active survey from env or Survey model
                sessionHash,
                stepIndex: 0,
            })
    }

    public async getSurvey(): Promise<Survey|null> {
        const session: SurveySession = this
        const survey: Survey|null = await session.related('survey').query().first()

        return survey
    }

    public async getCurrentStep(): Promise<string> {
        const survey = await this.getSurvey()

        if (this.stepIndex < 1) {
            return 'onboarding'
        } else if (this.stepIndex >= survey!.getStepNumber()) {
            return 'thanks'
        } else {
            return survey!.getStepNameFromIndex(this.stepIndex)
        }
    }

    public async incrementStep(): Promise<void> {
        this.stepIndex += 1
        await this.save()
    }
}

export default SurveySession
