using System;

namespace hoozonlinedatabase.Extensions
{
    public static class RandomUserName
    {
        private static readonly Random _random = new Random();
        public static string CreateUserName(string userName){
            var randomUser=userName.Substring(0,3)+_random.Next(1000,9999);
            return randomUser;
        }
    }
}