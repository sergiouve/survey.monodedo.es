import View from '@ioc:Adonis/Core/View'
import SurveySession from 'App/Domain/Surveys/Models/SurveySession'

class SurveyController {
  public async show({ session }) {
    const surveySession: SurveySession = await SurveySession.findOrCreateFromHash(session.sessionId)
    const currentStep = await surveySession.getCurrentStep()
    const view: string = `survey/questions/${currentStep}`

    return View.render(view)
  }

  public async store({ request, response, session }) {
    const surveySession: SurveySession = await SurveySession.findOrCreateFromHash(session.sessionId)
    await surveySession.incrementStep()
    const currentStep = await surveySession.getCurrentStep()
    const view: string = `survey/questions/${currentStep}`

    return View.render(view)
  }
}

export default SurveyController
