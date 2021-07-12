import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Survey from 'App/Domain/Surveys/Models/Survey'
import SurveyStates from 'App/Domain/Surveys/Types/SurveyStates'

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
        const currentSurvey = await Survey.getCurrentActive()

        return await SurveySession.findBy('sessionHash', sessionHash)
            || await SurveySession.create({
                surveyId: currentSurvey!.id,
                sessionHash,
                stepIndex: 0,
            })
    }

    public async getSurvey(): Promise<Survey|null> {
        const session: SurveySession = this
        const survey: Survey|null = await session.related('survey').query().first()

        return survey
    }

    public getCurrentStep(): string {
        return Survey.getStepNameFromIndex(this.stepIndex - 1)
    }

    public getState(): string {
        if (this.stepIndex < 1) {
            return SurveyStates.Onboarding
        } else if (this.stepIndex > Survey.getStepsLength()) {
            return SurveyStates.Finished
        } else {
            return SurveyStates.Questioning
        }
    }

    public async incrementStep(): Promise<void> {
        this.stepIndex += 1
        await this.save()
    }
}

export default SurveySession
