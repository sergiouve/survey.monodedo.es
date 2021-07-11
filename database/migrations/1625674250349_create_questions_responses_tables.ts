import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateQuestionsResponsesTables extends BaseSchema {
  protected tableName = 'questions_responses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('question_id')
      table.bigInteger('question_option_id')
      table.bigInteger('survey_session_id')
      table.text('response')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
