/* 
 * Author: Svyatoslab Belimov
 * Date: 16.11.2016
 */


MainApp = {
    final_stamp: {
        stamp_type_id    : undefined,
        stamp_type       : undefined,
        stamp_cost       : undefined,
        stamp_print_type : undefined,
        mobile_phone     : undefined,
        email            : undefined,
        second_name      : undefined,
        first_name       : undefined,
        organization     : undefined,
        ogrn             : undefined,
        third_name       : undefined,
        inn              : undefined,
        osnastka         : undefined,
        pay_format       : undefined,
        dostavka         : undefined,
        adres            : undefined
    },
    tmp_bind: undefined,
    stamp_types: {
        1 : 'Печать ИП',
        2 : 'Печать Юр. лица',
        3 : 'Печать по оттиску',
        4 : 'Печать врача',
        5 : 'Готовые штампы',
        6 : 'Штампы на заказ',
        7 : 'Штампы натариуса',
        8 : 'Факсимиле'
    },
    stamp_cost: {
        1 : 400,
        2 : 400,
        3 : 900,
        4 : 350,
        5 : 150,
        6 : 400,
        7 : 500,
        8 : 500
    },
    set_to_step:function(step){
        var _this = this;
        switch(step)
        {
            default:
                $('.st1').removeClass('active').addClass('active');
                $('.st2').removeClass('active');
                $('.st3').removeClass('active');
                _this.show_step1();
            break;
            case 2:
                if(_this.final_stamp.stamp_type_id !== undefined &&_this.final_stamp.stamp_type !== undefined &&_this.final_stamp.stamp_cost !== undefined )
                {
                    $('.st1').removeClass('active');
                    $('.st2').removeClass('active').addClass('active');
                    $('.st3').removeClass('active');
                    _this.show_step2();
                }
                else
                {
                    alert('Выберите тип печати!');
                    _this.set_to_step(1);
                }
            break;
            case 3:
                if((_this.final_stamp.stamp_type_id !== undefined &&_this.final_stamp.stamp_type !== undefined &&_this.final_stamp.stamp_cost !== undefined && _this.final_stamp.stamp_print_type !== undefined)|| true)
                {
                    $('.st1').removeClass('active');
                    $('.st2').removeClass('active');
                    $('.st3').removeClass('active').addClass('active');
                    _this.show_step3();
                }
                else
                {
                    alert('Выберите макет!');
                    _this.set_to_step(2);
                }
            break;
        }
    },
    show_stamp_type_and_cost: function(){
        $('.current-print').html(this.final_stamp.stamp_type + ' <span>' + this.final_stamp.stamp_cost+ ' Р</span>');
    },
    show_step3: function(){
        var _this = this;
        $('.step1').css('display','none');
        $('.step3').css('display','block');
        $('.step2').css('display','none');
        _this.show_stamp_type_and_cost();
        // var item = $('.item');
        // console.log(33);
        // for (var i = 0; i < item.lengs; i++) {
        //     console.log(22);
        //     if ($(item[i]).is('.none')) {
        //         $('.st3').trigger('click');
        //     }   
        // }
        $('.step_prev_2').click(function(){
            _this.set_to_step(2);
        });
       
       
       $('input[name="variables"]').change(function(){
           _this.final_stamp.osnastka = $(this).val();
       });
       
       
       $('input[name="pay_format"]').change(function(){
           _this.final_stamp.pay_format = $(this).val();
       });
       
       $('input[name="dostavka"]').change(function(){
           _this.final_stamp.dostavka = $(this).val();
       });
       
       
       
        _this.tmp_bind = Bind({
            mobile_phone : _this.final_stamp.mobile_phone,
            email        : _this.final_stamp.email,
            second_name  : _this.final_stamp.second_name,
            first_name   : _this.final_stamp.first_name,
            organization : _this.final_stamp.organization,
            ogrn         : _this.final_stamp.ogrn,
            third_name   : _this.final_stamp.third_name,
            inn          : _this.final_stamp.inn,
            adres        : _this.final_stamp.adres
        },{
            mobile_phone : '#mobile_phone',
            email        : '#email',
            second_name  : '#second_name',
            first_name   : '#first_name',
            organization : '#organization',
            ogrn         : '#ogrn',
            third_name   : '#third_name',
            inn          : '#inn',
            adres        : '#adres'
        });
       
       var arr_rew = [];
       $('#send_form').submit(function(e){
           e.preventDefault();
           _this.export_stamp();
           if(_this.check_send())
           {
                $.ajax({
                    type: "POST",
                    url: "/send.php",
                    data: {arr_rew : _this.final_stamp},
                    success: function(msg){
                      if(msg === '1')
                      {
							$(".error").remove();
							$(".sucsses").remove();
							$("<p class='sucsses'>Ваш заказ успешно оформлен!</p>").appendTo($(".total")).show("slow");
							$('.sucsses').fadeIn(1000);
							$('#submiting').attr('disabled','disabled');

                      }
                      else
                      {
                          alert('Ваш заказ не оформлен! Попробуйте еще раз!');
                      }
                    }
                });
           }
           else
           {
				$(".error").remove();
				$("<p class='error' style='display: none;'>Заполните все поля!</p>").appendTo($(".total"));
				$('.error').fadeIn(1000).fadeOut(1000);

           }
       });
       
    },
    check_send: function(){
        var _this = this;
        var errors = 0;
        $.each(_this.final_stamp, function(index, value) {
            if(value === undefined || value === "")
            {
                if(index !== 'adres')
                {
                    errors++;
                }
                
            }
        }); 
        if(errors > 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    },
    show_step2: function(){
        var _this = this;
        $('.step1').css('display','none');
        $('.step3').css('display','none');
        $('.step2').css('display','block');
        _this.show_stamp_type_and_cost();
        $('.step_prev_1').click(function(){
            _this.set_to_step(1);
        });
        $('div.radio-wrap > label').click(function(){
            _this.final_stamp.stamp_print_type = $(this).attr('data-stamp_print_type');
            _this.set_to_step(3);
        });
        $('input[name="step2"]').each(function(item){
            if(_this.final_stamp.stamp_print_type === $(this).attr('id'))
            {
                $(this).attr('selected','select');
            }
        });
    },
    show_step1: function(){
        var _this = this;
        $('.step1').css('display','block');
        $('.step2').css('display','none');
        $('.step3').css('display','none');
        $('.selected_link').each(function(item){
            $(this).removeClass('selected_link_a');
            if($(this).attr('data-stamp_type') == _this.final_stamp.stamp_type_id)
            {
                $(this).addClass('selected_link_a');
            }
        });
    },
    unset_selected_stamp_types: function(){
        $('.selected_link').each(function(item){
            $(this).removeClass('selected_link_a');
        });
    },
    bind_stamp_type_select: function(){
        var _this = this;
        $('.selected_link').click(function(){
            _this.unset_selected_stamp_types();
            $(this).addClass('selected_link_a');
            _this.final_stamp.stamp_type_id = $(this).attr('data-stamp_type');
            _this.final_stamp.stamp_type = _this.stamp_types[$(this).attr('data-stamp_type')];
            _this.final_stamp.stamp_cost = _this.stamp_cost[$(this).attr('data-stamp_type')];
            _this.set_to_step(2);
        });
    },
    bind_top_select_step: function(){
        var _this = this;
        $('.top_link_select').click(function(){
            _this.set_to_step(parseInt($(this).attr('data-step_value'),10));
        });
    },
    export_stamp: function(){
        var _this = this;
        var data = _this.tmp_bind.__export();
        $.each(data, function(index, value) {
            _this.final_stamp[index] = value;
        }); 
        console.log(this.final_stamp);
        return this.final_stamp;
    },
    set_popup: function(){
        $('#popup_form').submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type: "POST",
                url: "/popup.php",
                data: {
                    fio: $('#popup_fio').val(),
                    text: $('#popup_text').val()
                },
                success: function(msg){
                    $('#response_text').html('Ваша заявка успешно отправлена!');
                }
            });
            
        });
    },
    init: function(){
        this.set_to_step();
        this.bind_top_select_step();
        this.bind_stamp_type_select();
        this.set_popup();
    }
};

$(document).ready(function(){
    MainApp.init();
});