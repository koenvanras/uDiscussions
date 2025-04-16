using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace uDiscussions.Core.Models
{
    [TableName("uDiscussionsDocumentTypeSettings")]
    [PrimaryKey("Id", AutoIncrement = true)]
    [ExplicitColumns]
    public class DocumentTypeSettingsSchema
    {
        [PrimaryKeyColumn(AutoIncrement = true)]
        [Column("Id")]
        public int Id { get; set; }

        [Column("DocumentType")]
        public Guid DocumentType { get; set; }

        [Column("CommentsEnabled")]
        public bool CommentsEnabled { get; set; } = false;
    }
}
