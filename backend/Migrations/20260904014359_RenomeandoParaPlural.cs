using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class RenomeandoParaPlural : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Agendamento_Servico_ServicoId",
                table: "Agendamento");

            migrationBuilder.DropForeignKey(
                name: "FK_Agendamento_Usuarios_ClienteId",
                table: "Agendamento");

            migrationBuilder.DropForeignKey(
                name: "FK_Servico_Usuarios_BarbeiroId",
                table: "Servico");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Servico",
                table: "Servico");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Agendamento",
                table: "Agendamento");

            migrationBuilder.RenameTable(
                name: "Servico",
                newName: "Servicos");

            migrationBuilder.RenameTable(
                name: "Agendamento",
                newName: "Agendamentos");

            migrationBuilder.RenameIndex(
                name: "IX_Servico_BarbeiroId",
                table: "Servicos",
                newName: "IX_Servicos_BarbeiroId");

            migrationBuilder.RenameIndex(
                name: "IX_Agendamento_ServicoId",
                table: "Agendamentos",
                newName: "IX_Agendamentos_ServicoId");

            migrationBuilder.RenameIndex(
                name: "IX_Agendamento_ClienteId",
                table: "Agendamentos",
                newName: "IX_Agendamentos_ClienteId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Servicos",
                table: "Servicos",
                column: "IdServico");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Agendamentos",
                table: "Agendamentos",
                column: "IdAgendamento");

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamentos_Servicos_ServicoId",
                table: "Agendamentos",
                column: "ServicoId",
                principalTable: "Servicos",
                principalColumn: "IdServico",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamentos_Usuarios_ClienteId",
                table: "Agendamentos",
                column: "ClienteId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Servicos_Usuarios_BarbeiroId",
                table: "Servicos",
                column: "BarbeiroId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Agendamentos_Servicos_ServicoId",
                table: "Agendamentos");

            migrationBuilder.DropForeignKey(
                name: "FK_Agendamentos_Usuarios_ClienteId",
                table: "Agendamentos");

            migrationBuilder.DropForeignKey(
                name: "FK_Servicos_Usuarios_BarbeiroId",
                table: "Servicos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Servicos",
                table: "Servicos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Agendamentos",
                table: "Agendamentos");

            migrationBuilder.RenameTable(
                name: "Servicos",
                newName: "Servico");

            migrationBuilder.RenameTable(
                name: "Agendamentos",
                newName: "Agendamento");

            migrationBuilder.RenameIndex(
                name: "IX_Servicos_BarbeiroId",
                table: "Servico",
                newName: "IX_Servico_BarbeiroId");

            migrationBuilder.RenameIndex(
                name: "IX_Agendamentos_ServicoId",
                table: "Agendamento",
                newName: "IX_Agendamento_ServicoId");

            migrationBuilder.RenameIndex(
                name: "IX_Agendamentos_ClienteId",
                table: "Agendamento",
                newName: "IX_Agendamento_ClienteId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Servico",
                table: "Servico",
                column: "IdServico");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Agendamento",
                table: "Agendamento",
                column: "IdAgendamento");

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamento_Servico_ServicoId",
                table: "Agendamento",
                column: "ServicoId",
                principalTable: "Servico",
                principalColumn: "IdServico",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamento_Usuarios_ClienteId",
                table: "Agendamento",
                column: "ClienteId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Servico_Usuarios_BarbeiroId",
                table: "Servico",
                column: "BarbeiroId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
