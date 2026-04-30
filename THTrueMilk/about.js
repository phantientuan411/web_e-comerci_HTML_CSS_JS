// Tính năng Slideshow tự động cho phần Our Story
let storyIndex = 0;
autoStorySlides();

function autoStorySlides() {
    let i;
    let slides = document.getElementsByClassName("story-slide");
    
    // Ẩn tất cả các ảnh đi
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    // Tăng index để chuyển sang ảnh tiếp theo
    storyIndex++;
    
    // Nếu chạy vượt quá số lượng ảnh (4) thì quay lại ảnh 1
    if (storyIndex > slides.length) { 
        storyIndex = 1; 
    }    
    
    // Hiển thị ảnh hiện tại
    slides[storyIndex - 1].style.display = "block";  
    
    // Thiết lập thời gian đổi ảnh: 3000ms = 3 giây (Bạn có thể tăng giảm số này tùy ý)
    setTimeout(autoStorySlides, 2000); 
}