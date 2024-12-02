using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DigiForum_BE.Models
{
    public class PartnerRegistration
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public string CompanyName { get; set; }
        public string ServiceDescription { get; set; }
        public string SelectedPackage { get; set; }
        public decimal PaymentAmount { get; set; }
        public DateTime RegistrationDate { get; set; }
        public bool IsApproved { get; set; }
        public string AdminComments { get; set; }

        public User User { get; set; } 
    }
}
