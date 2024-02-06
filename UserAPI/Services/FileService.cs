using Microsoft.AspNetCore.StaticFiles;
using System.Net.Http.Headers;

namespace UserAPI.Services
{
    public class FileService
    {
        public async Task<string> UploadFileAsync(IFormFile file)
        {
            var folderName = Path.Combine("wwwroot", "AppFiles");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (!Directory.Exists(pathToSave))
                Directory.CreateDirectory(pathToSave);

            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fullPath = Path.Combine(pathToSave, fileName);
            var dbPath = Path.Combine(folderName, fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return dbPath;
        }
        public async Task<string> UploadImageAsync(IFormFile file)
        {
            var folderName = Path.Combine("wwwroot", "AppFiles");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (!Directory.Exists(pathToSave))
                Directory.CreateDirectory(pathToSave);
            var extention = Path.GetExtension(file.FileName);
            var fileName = Path.GetFileNameWithoutExtension(file.FileName);
            var url = string.Concat(Guid.NewGuid(), "-", fileName, extention);
            var fullPath = Path.Combine(pathToSave, url);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return url;
        }
        public async Task<Tuple<MemoryStream, string>> DownLoadFileAsync(string filePath)
        {
            var contentType = GetContentType(filePath);

            var memory = new MemoryStream();
            await using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return Tuple.Create(memory, contentType);
        }


        public IEnumerable<string> GetPhotoUrls()
        {
            var folderName = Path.Combine("wwwroot", "AppFiles");
            var pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            var photos = Directory.EnumerateFiles(pathToRead)
                .Where(IsAPhotoFile)
                .Select(fullPath => Path.Combine(folderName, Path.GetFileName(fullPath)));
            return photos;
        }

        private bool IsAPhotoFile(string fileName)
        {
            return fileName.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)
                   || fileName.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase)
                   || fileName.EndsWith(".png", StringComparison.OrdinalIgnoreCase);
        }

        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;

            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }

            return contentType;
        }
    }
}
