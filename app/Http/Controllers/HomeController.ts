import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'

class HomeController {
  public async show(context: HttpContextContract) {
    return View.render('home')
  }
}

export default HomeController
