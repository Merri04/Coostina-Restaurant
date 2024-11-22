using System.Security.Cryptography;

namespace Injera.Helpers
{
    public class PasswordHelper
    {
        public static string HashPassword(string password)
            {
                var saltBytes = new byte[16]; // 128 bits
                RandomNumberGenerator.Fill(saltBytes); 
                var salt = Convert.ToBase64String(saltBytes);

                using (var rfc2898 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256))
                {
                    var hash = Convert.ToBase64String(rfc2898.GetBytes(32)); 
                    return $"{salt}:{hash}"; 
                }
            }


        public static bool VerifyPassword(string enteredPassword, string storedPassword)
        {
            var passwordParts = storedPassword.Split(':');
            if (passwordParts.Length != 2) 
                return false;  
            
            var saltBytes = Convert.FromBase64String(passwordParts[0]);
            using (var rfc2898 = new Rfc2898DeriveBytes(enteredPassword, saltBytes, 10000, HashAlgorithmName.SHA256)) 
            {
                var enteredHash = Convert.ToBase64String(rfc2898.GetBytes(32)); 
                return enteredHash == passwordParts[1];
            }
        }
    }
}

// what hashing algorithm is used in the HashPassword method?
// SHA256
// what is the purpose of the salt in the HashPassword method?
// To add randomness to the hash value and prevent the same password from generating the same hash value
// what is the purpose of the storedPassword parameter in the VerifyPassword method?
// To compare the entered password with the stored password to verify the password
// what is the purpose of the saltBytes variable in the VerifyPassword method?
// To extract the salt value from the stored password for verifying the entered password
// what is the purpose of the rfc2898 variable in the VerifyPassword method?
// To generate the hash value of the entered password using the salt value
// what is the purpose of the enteredHash variable in the VerifyPassword method?
// To store the hash value of the entered password for comparison with the stored hash value
// what is the purpose of the passwordParts variable in the VerifyPassword method?
// To split the stored password into the salt and hash value for verification
// what is the purpose of the storedPassword.Split(':') method call in the VerifyPassword method?
// To split the stored password into the salt and hash value using the colon (:) as the separator
// what is the purpose of the Convert.FromBase64String(passwordParts[0]) method call in the VerifyPassword method?
// To convert the salt value from a Base64 string to a byte array for use in generating the hash value of the entered password
// what is the purpose of the Convert.ToBase64String(rfc2898.GetBytes(32)) method call in the VerifyPassword method?
// To generate a 256-bit hash value of the entered password using the salt value
// what is the purpose of the enteredHash == passwordParts[1] comparison in the VerifyPassword method?
// To compare the generated hash value of the entered password with the stored hash value for verification
