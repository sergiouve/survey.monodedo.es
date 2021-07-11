import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateQuestionsOptionsTables extends BaseSchema {
  protected tableName = 'questions_options'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('question_id')
      table.text('text')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
