using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BertiniEventos.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RenameUserFieldsToEnglish : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrimeiroNome",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UltimoNome",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Titulo",
                table: "AspNetUsers",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Funcao",
                table: "AspNetUsers",
                newName: "Function");

            migrationBuilder.RenameColumn(
                name: "Descricao",
                table: "AspNetUsers",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "AspNetUsers",
                newName: "Titulo");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "AspNetUsers",
                newName: "Descricao");

            migrationBuilder.RenameColumn(
                name: "Function",
                table: "AspNetUsers",
                newName: "Funcao");

            migrationBuilder.AddColumn<string>(
                name: "PrimeiroNome",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UltimoNome",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
