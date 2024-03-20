<?php
include_once '../../init.php';


if (isset($_GET['page_id'])) {
    $slug = $_GET['page_id'];

    $data = fetch_data("SELECT * FROM blogs WHERE `slug` = '$slug'");

    if (!$data) {
        header("Location: " . home_path() . "404");
    }
} else {
    header("Location: " . home_path() . "state-to-state");
}


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?= $data['meta']; ?>
    <link rel="stylesheet" href="<?= get_css() ?>pageCareer-child.css">
    <?php
    include_once head;
    ?>
</head>

<body>
    <!-- header of the page -->
    <?php
    include_once header;
    ?>

    <main>
        <div class="image-of-security">
            <img class="w-100" src="../../subdomains/dashboard/assets/images/newblog/<?= $data['title_img']; ?>" alt="<?= $data['title_img_alt']; ?>">
        </div>
        <div class="contain-of-security">
            <h2 class="m-b-10"> <?= $data['title']; ?></h2>
            <i class="m-tb-15"><?php
                                $dateStr = strtotime($data['added_on']);
                                echo date('d-m-Y', $dateStr); ?></i>
            <p class="m-tb-15 contain-text text" data-aos="fade-in">
                <?= $data['content']; ?>
            </p>

            <div class="contain-security-social">
                <p>Follow us for more:</p>
                <div class="contain-security-social-image flex flex-center">
                    <a href="https://www.facebook.com/groupl"><img class="w-100" data-aos="zoom-in" src="<?= get_img() ?>Vector-(10).png" alt=""></a>
                    <a href="https://www.linkedin.com/company/groupl-pvt-ltd/"><img class="w-100" data-aos="zoom-in" src="<?= get_img() ?>Vector-(11).png" alt=""></a>
                <!--    <img class="w-100" data-aos="zoom-in" src="<?= get_img() ?>Vector-(12).png" alt=""> -->
                    <!-- <img class="w-100" data-aos="zoom-in" src="<?= get_img() ?>Vector-(13).png" alt=""> -->
                </div>
            </div>
        </div>
        <div class="contain-of-relatable">
            <h3>Relatable Blogs </h3>
            <div class="contain-of-relatable-image grid grid-4 w-100">
                <img src="<?= get_img() ?>manned-guarding-image-2.jpg" alt="" data-aos="fade-up">
                <img src="<?= get_img() ?>manned-guarding-image-3.jpg" alt="" data-aos="fade-up">
                <img src="<?= get_img() ?>manned-guarding-image-4.jpg" alt="" data-aos="fade-up">
                <img src="<?= get_img() ?>manned-guarding-image-6.jpg" alt="" data-aos="fade-up">

            </div>
        </div>
    </main>

    <!-- footer of the page -->
    <?php include_once page_bottom ?>

</body>

</html>