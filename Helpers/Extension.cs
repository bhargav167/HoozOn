using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace HoozOn.Helpers {
    public static class Extension {
        public static void ApplicationError (this HttpResponse responce, string message) {
            responce.Headers.Add ("Application-error", message);
            responce.Headers.Add ("Access-Control-Expose-Header", "Application-error");
            responce.Headers.Add ("Access-Control-Allow-Origin", "*");
        }
        public static void AddPagination (this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages) {
            var paginationHeader = new PaginationHeader (currentPage, itemsPerPage, totalItems, totalPages);
            var camelCaseFormatter = new JsonSerializerSettings ();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver ();
            response.Headers.Add ("Pagination", JsonConvert.SerializeObject (paginationHeader, camelCaseFormatter));
            response.Headers.Add ("Access-Control-Expose-Headers", "Pagination");
        }
    }
}