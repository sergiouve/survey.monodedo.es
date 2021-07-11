import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateQuestionsQuestionsTables extends BaseSchema {
  protected tableName = 'questions_questions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('survey_id')
      table.bigInteger('category_id')
      table.text('text')
      table.string('type')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
