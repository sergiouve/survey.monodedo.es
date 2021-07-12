import View from '@ioc:Adonis/Core/View'

import SurveySession from 'App/Domain/Surveys/Models/SurveySession'
import QuestionCategory from 'App/Domain/Questions/Models/QuestionCategory'
import SurveyStates from 'App/Domain/Surveys/Types/SurveyStates'

class SurveyController {
  public async show({ session }) {
    const surveySession = await SurveySession.findOrCreateFromHash(session.sessionId)

    switch (surveySession.getState()) {
        case SurveyStates.Onboarding: {
          return View.render(`survey/onboarding`)
        }
        case SurveyStates.Questioning: {
          const currentStep = surveySession.getCurrentStep()
          const category = await QuestionCategory.findBy('name', currentStep)
          const questions = await category!.related('questions').query()

          return View.render(`survey/questions`, { currentStep, questions })
        }
        case SurveyStates.Finished: {
          return View.render(`survey/thanks`)
        }
    }
  }

  public async store({ request, response, session }) {
    const surveySession: SurveySession = await SurveySession.findOrCreateFromHash(session.sessionId)
    await surveySession.incrementStep()

    response.redirect().back()
  }
}

export default SurveyController
