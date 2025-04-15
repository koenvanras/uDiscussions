using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Discussions.Core.Models
{
    [TableName("umbracoDiscussionsLikes")]
    [PrimaryKey("Id", AutoIncrement = true)]
    [ExplicitColumns]
    public class LikeSchema
    {
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        [Column("Id")]
        public int Id { get; set; }

        [Column("Fingerprint")]
        public Guid Fingerprint { get; set; }

        [Column("Comment")]
        [ForeignKey(typeof(CommentSchema), Column = "Id")]
        public int CommentId { get; set; }
    }
}
