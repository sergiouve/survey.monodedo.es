import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateSurveysSessionsTables extends BaseSchema {
  protected tableName = 'surveys_sessions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('survey_id')
      table.text('session_hash')
      table.integer('step_index').unsigned()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
