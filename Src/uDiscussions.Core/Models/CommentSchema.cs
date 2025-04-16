using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace uDiscussions.Core.Models
{
    [TableName("uDiscussionsComments")]
    [PrimaryKey("Id", AutoIncrement = true)]
    [ExplicitColumns]
    public class CommentSchema
    {
        [PrimaryKeyColumn(AutoIncrement = true)]
        [Column("Id")]
        public int Id { get; set; }

        [Column("Date")]
        public DateTime Date { get; set; }

        [Column("Author")]
        public string Author { get; set; } = "Unknown";

        [Column("Message")]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string Message { get; set; } = "Unknown";

        [Column("ContentKey")]
        public Guid ContentKey { get; set; }

        [Column("ContentName")]
        public string ContentName { get; set; } = "Unknown";

        [Column("Approved")]
        public bool Approved { get; set; } = false;

        [Column("Trashed")]
        public bool Trashed { get; set; } = false;

        [Column("ReplyTo")]
        [NullSetting(NullSetting = NullSettings.Null)]
        [ForeignKey(typeof(CommentSchema), Column = "Id")]
        public int? ReplyTo { get; set; }
    }
}
