using Microsoft.AspNetCore.Identity;
using WmsBackend.Models;

namespace WmsBackend.Data
{
    public static class AdminSeeder
    {
        public static async Task SeedAdminAsync(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

            // 1. Seed Roles
            string[] roleNames = { "Admin", "Supervisor", "QA_QC", "Accountant", "Worker", "System_ERP" };
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new ApplicationRole { Name = roleName, Description = $"Role for {roleName}" });
                }
            }

            // 2. Seed Users
            var usersToSeed = new List<(string Email, string Name, string Role)>
            {
                ("admin@wms.com", "System Admin", "Admin"),
                ("worker@wms.com", "Nguyen Van Picker", "Worker"),
                ("supervisor@wms.com", "Tran Quang Manager", "Supervisor"),
                ("qc@wms.com", "Le Thi QC", "QA_QC"),
                ("accountant@wms.com", "Hoang Ke Toan", "Accountant"),
                ("erp_system@wms.com", "ERP Integration Service", "System_ERP")
            };

            foreach (var u in usersToSeed)
            {
                var user = await userManager.FindByEmailAsync(u.Email);
                if (user == null)
                {
                    var newUser = new ApplicationUser
                    {
                        UserName = u.Email,
                        Email = u.Email,
                        FullName = u.Name,
                        EmailConfirmed = true,
                        Department = u.Role == "Worker" ? "Operations" : "Management",
                        Designation = u.Role
                    };
                    var result = await userManager.CreateAsync(newUser, "Wms123456!");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(newUser, u.Role);
                    }
                }
            }
        }
    }
}
