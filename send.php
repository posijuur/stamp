<?php

$form_data = array();


 
 
 
$ar = $_POST['arr_rew'];
	$per = 0;
	foreach($ar as $zn){
		if($per == 0){
			$type_id = $zn;
		}	
		if($per == 1){
			$type = $zn;
		}
		if($per == 2){
			$cost = $zn;
		}
		if($per == 3){
			$print = $zn;
		}
		if($per == 4){
			$phone = $zn;
		}	
		if($per == 5){
			$email = $zn;
		}
		if($per == 6){
			$second_name = $zn;
		}
		if($per == 7){
			$first_name = $zn;
		}
		if($per == 8){
			$org = $zn;
		}
		if($per == 9){
			$ogrn = $zn;
		}
		if($per == 10){
			$third_name = $zn;
		}
		if($per == 11){
			$inn = $zn;
		}
		if($per == 12){
			$osnastka = $zn;
		}
		if($per == 13){
			$pay_format = $zn;
		}
		if($per == 14){
			$dostavka = $zn;
		}
		if($per == 15){
			$adres = $zn;
		}
	$per++;
	}
	$ars = array("Тип печати" => $type, "Стоимость" => $cost, "Телефон" => $phone, "E-mail" => $email, "Фамилия" => $second_name, "Иммя" => $first_name, "Иммя" => $first_name, "Отчество"=> $third_name, "Организация"=>$org, "ОГРН"=>$ogrn, "ИНН"=>$inn, "Оснастка"=>$osnastka, "Способ оплаты"=>$pay_format, "Доставка"=>$dostavka, "Адрес"=>$adres);


        $message = "<h3>Заявка с сайта юрист-удаленно.рф</h3>";

        foreach($ars as $k => $v)
            {
                $message .= $k.": ".$v."<br />";
            }

        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=utf8' . "\r\n";

        if (mail('seo.strelcov@ya.ru', 'Заявка с сайта ИВВАНОВСКИЕПЕЧАТИ.РФ', $message, $headers))
            {
				echo 1;
            }
        else
            {
                echo 0;
            }




?>